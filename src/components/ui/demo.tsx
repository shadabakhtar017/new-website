"use client";

import Timeline from "@/components/ui/timeline";

const settings = {
  textColor: "#171717",
  mutedTextColor: "#737373",
  activeColor: "#ff5f00",
  backgroundColor: "#FFFFFF",
  duration: 1.4,
};

export default function TimelineDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  return (
    <div className="w-full bg-background text-foreground">
      <Timeline
        title="Care That Makes You Smile"
        periodLabel="PATIENT STORIES"
        backgroundColor={s.backgroundColor}
        textColor={s.textColor}
        mutedTextColor={s.mutedTextColor}
        activeColor={s.activeColor}
        imageUrl="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
        imageAlt="Dr. Ayesha Mehta consulting patient in modern clinic"
        duration={s.duration}
      />
    </div>
  );
}
