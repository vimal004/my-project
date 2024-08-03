const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <p className="hidden md:block lg:text-red-500">
        Click on the "About" link in the header to visit the about page.
      </p>
    </div>
  );
};

export default Home;
