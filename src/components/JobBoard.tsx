import Header from "./Header";
import JobList from "./JobList";

const JobBoard = () => {
  return (
    <div className="container mx-auto ">
      <Header onAddJob={() => console.log("onAddJob")} />
      <JobList />
    </div>
  );
};

export default JobBoard;
