import createAdmin from "../../../lib/createAdmin";

export default async function Init() {
  const result = await createAdmin();
  console.log("the result is ", result)
  return (<div className="mt-20 text-center">
          { result && <h1>{result}</h1>}
      
    </div>
  );
}
