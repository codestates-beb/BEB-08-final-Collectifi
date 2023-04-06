import React, { useState } from 'react';
import Button from '../components/UI/Button';
import AlertModal from '../components/UI/AlertModal';

const MainPage = () => {
  const [error, setError] = useState<any>(null);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <Button onClick={()=>{setError("asd")}}>TEST</Button>
      {error && (
        <AlertModal
          title={"title"}
          message={"message"}
          onConfirm={errorHandler}
        />
      )}
    </>
  );
};

export default MainPage;
