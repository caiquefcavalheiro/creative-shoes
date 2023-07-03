import Header from "@/components/Header/header";
import ProductList from "@/components/ProductList/productList";
import HomeContainer from "@/components/HomeContainer/homeContainer";

export default function Home() {
  return (
    <main className="bg-cover bg-galaxy w-[100vw] h-[100vh] relative">
      <Header></Header>
      <HomeContainer />
      <ProductList></ProductList>
    </main>
  );
}
