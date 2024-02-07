// import styles from "./page.module.css";
import { getDNSRecords } from './breaking'

async function getData() {
  return getDNSRecords()
}

export default async function Home() {
  const data = await getData()

  return hi
}
