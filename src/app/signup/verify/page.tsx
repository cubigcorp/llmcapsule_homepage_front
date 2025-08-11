import { Suspense } from 'react';
import VerifyClient from './VerifyClient';

function SignupVerifyContent() {
  return <VerifyClient />;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupVerifyContent />
    </Suspense>
  );
}
