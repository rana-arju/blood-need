import Chat from "../../../components/Chat";

export default function ChatPage({
  params,
}: {
  params: { recipientId: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <Chat recipientId={params.recipientId} />
    </div>
  );
}
