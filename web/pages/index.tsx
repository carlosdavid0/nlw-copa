import React from "react";

interface IHomeProps {
 count: number;

}

export default function Home(props:IHomeProps) {


  return (
    <>
      <h1>contagem: {props.count}</h1>
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3333/pools/count");
  const data = await res.json();
  console.log(data);

  return {
    props: {
      count: data.count
    },
  };
};
