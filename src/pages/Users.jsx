import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";

function NewUsers() {
  return (
    <>
      <Heading as="h1">创建新用户</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
