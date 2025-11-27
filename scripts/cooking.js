const fetchData = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=pizza",
  );
  const result = await res.json();
  console.log(result);
};
fetchData();
