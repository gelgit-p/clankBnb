  export async function fetchListing(id: string) {
    // try {
      // Loading.circle()
      // const res = await quotesRequests.getAllQuotes()

      const numericId = Number(id);

      // Ensure the id is a valid number
      if (isNaN(numericId)) {
        throw new Error('Invalid ID');
      }


      const res = await fetch(
        `https://clankbnb.onrender.com/api/v1/listing/${numericId}`,
      )
      // if (!data.success) {
      //   Loading.remove()
      //   return Notify.failure(res.message)
      const listings_data = await res.json()

      return listings_data.toString();
    // } catch (error) {
    //   console.error('error fetching listings', error)
    // }
  }