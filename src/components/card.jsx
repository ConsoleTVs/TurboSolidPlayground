import { Suspense } from "solid-js";

const Card = (props) => {
  return (
    <div class="border bg-white p-6 rounded">
      <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
    </div>
  );
};

export default Card;
