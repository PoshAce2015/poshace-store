interface ShareButtonsProps {
  url: string;
  title: string;
}

const shareLinks = [
  {
    name: "WhatsApp",
    icon: "📱",
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    name: "Facebook",
    icon: "📘",
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "Twitter",
    icon: "🐦",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "LinkedIn",
    icon: "💼",
    getUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Pinterest",
    icon: "📌",
    getUrl: (url: string, title: string) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
  },
];

export function ShareButtons({ url, title }: ShareButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Share:</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.getUrl(url, title)}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${link.name}`}
          className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-accent transition-colors text-sm"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
