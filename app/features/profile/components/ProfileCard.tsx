"use client";
import ProfileForm from "./ProfileForm";
import { useProfile } from "../hooks/useProfile";

function ProfileCard() {
  const { data } = useProfile();
  const profileData = data?.data;
  return (
    <div className=" border border-[#ddd] rounded-xl w-full min-h-96 p-2 lg:p-5">
      <ProfileForm />
    </div>
  );
}

export default ProfileCard;
