// Define the structure of a queued request
interface QueuedRequest {
  url: string;
  options: RequestInit;
  userId?: string;
  timestamp: number;
}

const QUEUE_KEY = "offline_notification_queue";

// Add a request to the offline queue
export async function addToOfflineQueue(
  url: string,
  options: RequestInit,
  userId?: string
): Promise<void> {
  try {
    // Get existing queue from localStorage
    const queueString = localStorage.getItem(QUEUE_KEY);
    const queue: QueuedRequest[] = queueString ? JSON.parse(queueString) : [];

    // Add new request to queue
    queue.push({
      url,
      options: {
        method: options.method,
        headers: options.headers,
        body: options.body
          ? JSON.stringify(JSON.parse(options.body as string))
          : undefined,
      },
      userId,
      timestamp: Date.now(),
    });

    // Save updated queue to localStorage
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));

    console.log("Request added to offline queue:", {
      url,
      method: options.method,
    });
  } catch (error) {
    console.error("Error adding request to offline queue:", error);
  }
}

// Process all requests in the offline queue
export async function processOfflineQueue(userId?: string): Promise<void> {
  if (!navigator.onLine) {
    console.log("Still offline, cannot process queue");
    return;
  }

  try {
    // Get queue from localStorage
    const queueString = localStorage.getItem(QUEUE_KEY);
    if (!queueString) return;

    const queue: QueuedRequest[] = JSON.parse(queueString);
    if (queue.length === 0) return;

    console.log(`Processing ${queue.length} queued requests`);

    // Process each request in the queue
    const newQueue: QueuedRequest[] = [];

    for (const item of queue) {
      try {
        // Use the provided userId or the one stored with the request
        const authUserId = userId || item.userId;

        // Skip if no userId is available and the request requires authentication
        if (!authUserId) {
          newQueue.push(item);
          continue;
        }

        // Prepare headers with Authorization
        const headers: HeadersInit = {
          "Content-Type": "application/json",
          ...(item.options.headers || {}),
        };

        // Add Authorization header with userId as Bearer token
        (headers as Record<string, string>)[
          "Authorization"
        ] = `Bearer ${authUserId}`;

        // Make the request
        const response = await fetch(item.url, {
          method: item.options.method,
          headers,
          body: item.options.body as string,
        });

        if (!response.ok) {
          console.error(
            `Failed to process queued request: ${response.status} ${response.statusText}`
          );
          // Keep failed requests in the queue for retry
          newQueue.push(item);
        } else {
          console.log(`Successfully processed queued request: ${item.url}`);
        }
      } catch (error) {
        console.error("Error processing queued request:", error);
        // Keep failed requests in the queue for retry
        newQueue.push(item);
      }
    }

    // Update queue in localStorage
    localStorage.setItem(QUEUE_KEY, JSON.stringify(newQueue));

    console.log(
      `Processed offline queue. ${queue.length - newQueue.length} succeeded, ${
        newQueue.length
      } remaining.`
    );
  } catch (error) {
    console.error("Error processing offline queue:", error);
  }
}

// Clear the offline queue
export function clearOfflineQueue(): void {
  localStorage.removeItem(QUEUE_KEY);
}

// Function to get the offline queue from storage
function getQueue(): QueuedRequest[] {
  try {
    const queueJson = localStorage.getItem(QUEUE_KEY);
    return queueJson ? JSON.parse(queueJson) : [];
  } catch (error) {
    console.error("Error getting offline queue:", error);
    return [];
  }
}

// Function to save the offline queue to storage
function saveQueue(queue: QueuedRequest[]): void {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error("Error saving offline queue:", error);
  }
}

// Set up event listeners for online/offline status
export function setupOfflineListeners(userId?: string): () => void {
  const handleOnline = () => {
    console.log("Device is online, processing offline queue");
    processOfflineQueue(userId);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("online", handleOnline);

    // Check if we're online now and process queue
    if (navigator.onLine) {
      processOfflineQueue(userId);
    }
  }

  // Return cleanup function
  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("online", handleOnline);
    }
  };
}
