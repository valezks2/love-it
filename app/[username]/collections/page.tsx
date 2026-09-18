"use client";
import ProfileWrapper from "@/components/ProfileWrapper";
import CollectionsGrid from "@/components/grids/CollectionsGrid";

export default function CollectionsPage() {
  return (
    <ProfileWrapper activeTab="collections">
      <CollectionsGrid />
    </ProfileWrapper>
  );
}
