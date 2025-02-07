import webpush from "web-push";
import prisma from "@/lib/prisma";

webpush.setVapidDetails(
  "mailto:ranaarju20@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function sendPushNotification(
  userId: string,
  title: string,
  body: string
) {
  const subscriptions = await prisma.pushSubscription.findMany({
    where: { userId },
  });

  const notifications = subscriptions.map(
    (subscription: { endpoint: string; p256dh: string; auth: string }) => {
      return webpush.sendNotification(
        {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.p256dh,
            auth: subscription.auth,
          },
        },
        JSON.stringify({ title, body })
      );
    }
  );

  await Promise.all(notifications);
}
