import Card from "../components/card";
import Button from "../components/button";

const Page = () => {
  return (
    <div class="container mx-auto">
      <div className="grid grid-cols-1 gap-12">
        <Card>
          <div className="flex flex-col space-y-3">
            <h1 class="font-semibold text-xl">Card title</h1>
            <p class="text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id
              ligula tincidunt, faucibus ex non, dignissim massa. Donec neque
              justo, ornare ut varius id, pulvinar eu lorem. Nunc aliquam, purus
              sed sodales finibus, turpis nisi pellentesque libero, at dignissim
              ante turpis ac lorem. Ut gravida ac leo in placerat. Aliquam a
              tempor urna. Phasellus quis neque suscipit, vehicula ipsum vel,
              aliquet arcu. Aenean finibus facilisis turpis, a dictum arcu
              consequat non.
            </p>
            <div>
              <Button>Refetch</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
