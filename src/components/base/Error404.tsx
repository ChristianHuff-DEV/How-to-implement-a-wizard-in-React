/**
 * Generic error message indicating to the user that an unknown route was opened.
 */
const Error404 = () => {
  return (
    <div className="text-gray-600 body-font">
      <div className="container mx-auto flex py-24 items-center justify-center flex-col">
        <h1 className="title-font text-4xl  font-medium text-gray-900">
          404 - Page not found
        </h1>
      </div>
    </div>
  );
};

export default Error404;
