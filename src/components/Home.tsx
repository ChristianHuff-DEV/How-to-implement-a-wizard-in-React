import JobBoard from "./JobBoard";

const Home = () => {
  return (
    <div className="container mx-auto ">
      <section className="text-gray-600 body-font">
        <div className="px-5 py-24">
          <div className=" flex flex-row  items-start mx-auto">
            <h1 className="flex-grow pr-16 text-2xl font-medium title-font text-gray-900">
							Find your next dream job.
            </h1>
            <a className="hover:cursor-pointer ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Go to Jobs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
