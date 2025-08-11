import { Suspense } from 'react';
import ResetPasswordVerifyClient from './ResetPasswordVerifyClient';

function ResetPasswordVerifyContent() {
  return <ResetPasswordVerifyClient />;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordVerifyContent />
    </Suspense>
  );
}
