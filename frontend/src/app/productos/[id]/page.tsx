"use client"
import { useParams } from "next/navigation"
import { useCallback, useEffect } from "react"
import api from "@/lib/api"
import ProductForm from "@/components/producto/ProductForm"

function ProductoPage() {
  const params = useParams<{ id: string }>()

  const fetchProducto = useCallback(async () => {
    const response = await api.get(`/productos/info/${params.id}`)
    return response.data
  }, [params.id])

  useEffect(() => {
    async function fetchData() {
      await fetchProducto()
    }

    fetchData()
  }, [params.id, fetchProducto])

  return (
    <div>
      <h1>Editar producto</h1>

      <ProductForm />
    </div>
  )
}

export default ProductoPage
