import JobBoardHeader from "./JobBoardHeader";
import JobList from "./JobList";

const JobBoard = () => {
  return (
    <div className="container mx-auto ">
      <JobBoardHeader onAddJob={() => console.log("onAddJob")} />
      <JobList />
    </div>
  );
};

export default JobBoard;
