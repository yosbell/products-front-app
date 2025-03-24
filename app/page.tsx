import styles from "./page.module.css";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/products/product-list";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <Box as="main" width={'100%'} p="4">
        <ProductList />
      </Box>
      <Footer />
    </div>
  );
}
