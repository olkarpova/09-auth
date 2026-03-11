import Link from "next/link";
import Image from "next/image";
import { getServerMe } from "@/lib/api/serverApi";
import css from "./Profile.module.css";
import { Metadata } from "next";

// interface ProfileProps {
//     params: Promise<{}>
// }

export default async function Profile() {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      </div>
    </main>
  );
}
export const metadata: Metadata = {
  title: "Profile - NoteHub",
  description: "Your personal profile page",
  openGraph: {
    title: "Profile - NoteHub",
    description: "Manage your account and preferences",
    images: "/og-profile.jpg",
  },
};
