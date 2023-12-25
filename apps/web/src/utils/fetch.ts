
interface FetchOptions {
    query: string,
    variables: any,
    next: {
        revalidate: number
    }

}

export default async function fetchAPI( options: FetchOptions) {
    const { data } = await fetch(process.env.GRAPHQL_API!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: options.query,
        variables: options.variables
      }),
      next: options.next,
    }).then((res) => res.json())

    return data;
}