import { redirect } from "next/navigation";

export default function DownloadPage() {
  if (typeof window !== "undefined") {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;


    const playStoreLink = "https://play.google.com/store/apps/details?id=com.yonderwonder.weclick&hl=en";
    const appStoreLink = "https://apps.apple.com/in/app/weclick-ai-group-photos/id6751394927";
    const fallbackLink = "https://weclick.yonderwonder.ai";

    if (/android/i.test(userAgent)) {
      window.location.href = playStoreLink;
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href = appStoreLink;
    } else {
      window.location.href = fallbackLink;
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white text-gray-700">
      <p>Redirecting you to the right app store...</p>
    </div>
  );
}