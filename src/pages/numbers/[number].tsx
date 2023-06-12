import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = new Array(200).fill("").map((_, index) => {
    return { params: { number: `${index}` } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const number = context.params?.number as string;

  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return {
    props: {
      number,
    },
  };
};

export default function Page({ number }: { number: string }) {
  return <div>Number {number}</div>;
}
