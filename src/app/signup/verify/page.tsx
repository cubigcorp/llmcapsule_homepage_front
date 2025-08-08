import VerifyClient from './VerifyClient';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    token?: string;
    email?: string;
    google?: string;
    firstName?: string;
    lastName?: string;
    sub?: string;
  }>;
}) {
  const {
    token = '',
    email = '',
    google = '',
    firstName = '',
    lastName = '',
    sub = '',
  } = await searchParams;

  return (
    <VerifyClient
      token={token}
      email={email}
      google={google}
      firstName={firstName}
      lastName={lastName}
      sub={sub}
    />
  );
}
