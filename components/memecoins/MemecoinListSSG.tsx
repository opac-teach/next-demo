import MemecoinListRSC from "./MemecoinListRSC";

export const dynamic = "force-static";
// export const revalidate = false;

const MemecoinsListSSG = () => (
  <div className="space-y-4">
    <h1 className="text-xl font-bold">Memecoins version ssg</h1>
    <MemecoinListRSC />
  </div>
);

export default MemecoinsListSSG;
