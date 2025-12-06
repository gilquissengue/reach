import { MessageCircle, MessageSquare } from "lucide-react";

export default function FloatingWidgets() {
  return (
    <div className="fixed bottom-24 right-6 flex flex-col gap-4 z-40">
      <button className="bg-blue-600 p-3 rounded-full text-white shadow-lg hover:scale-110 transition-transform">
        <MessageSquare className="w-6 h-6" />
      </button>
      <button className="bg-[#25D366] p-3 rounded-full text-white shadow-lg hover:scale-110 transition-transform">
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
