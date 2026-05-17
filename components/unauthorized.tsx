export default function Unauthorized() {
  return (
    <div className="grid gap-4 py-80 text-center">
      <h1 className="text-4xl font-bold">Unauthorized</h1>
      <p className="text-xl">Only Admins are able to access this page!</p>
    </div>
  );
}
