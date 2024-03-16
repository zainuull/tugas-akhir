import CreateUser from './(presentation)/(components)/create/create';


const RegisterPage = () => {
  return (
    <div className="w-full h-screen bg-secondary p-4 flex items-center justify-center select-none">
      <CreateUser />
    </div>
  );
};

export default RegisterPage;
