"use client";

const error = (error: { message: string }) => {
  return <p>Could not fetch the list of notes. {error.message}</p>;
};

export default error;
