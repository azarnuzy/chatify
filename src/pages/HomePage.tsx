import MainLayout from '../components/layout/MainLayout';

const HomePage = () => {
  return (
    <MainLayout>
      <div className="flex w-full justify-center mt-14 sm:mt-10">
        <img src={'/logo.png'} alt="Logo" />
      </div>
    </MainLayout>
  );
};

export default HomePage;
