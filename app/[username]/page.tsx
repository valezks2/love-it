"use client";
import ProfileWrapper from "@/components/ui/ProfileWrapper";
import CollectionsGrid from "@/components/ui/CollectionsGrid";

export default function ProfilePage() {
  return (
    <ProfileWrapper activeTab="collections">
      <CollectionsGrid />
    </ProfileWrapper>
  );
}
