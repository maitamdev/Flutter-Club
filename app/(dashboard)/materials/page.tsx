'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Trash2, Download, FileText, Loader2, Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/hooks/useAuth'
import { getMaterials, uploadMaterial, deleteMaterial } from '@/lib/firebase/firestore'
import { Material } from '@/types'

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('general')
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { isTrainer, user } = useAuth()

  // Check permissions
  useEffect(() => {
    if (!isTrainer) {
      router.push('/dashboard')
    }
  }, [isTrainer, router])

  // Load materials
  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const data = await getMaterials()
        setMaterials(data)
      } catch (error) {
        console.error('Error loading materials:', error)
        toast({
          title: 'Lỗi',
          description: 'Không thể tải tài liệu',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }
    loadMaterials()
  }, [toast])

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !file || !user) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng điền đầy đủ thông tin',
        variant: 'destructive',
      })
      return
    }

    setUploading(true)
    try {
      await uploadMaterial({
        title: title.trim(),
        category,
        fileName: file.name,
        fileSize: file.size,
        file,
        uploadedBy: user.name,
        uploadedAt: new Date(),
      })

      toast({
        title: 'Thành công',
        description: 'Tải lên tài liệu thành công',
      })

      setTitle('')
      setCategory('general')
      setFile(null)

      // Reload materials
      const data = await getMaterials()
      setMaterials(data)
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message || 'Không thể tải lên tài liệu',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn chắc chắn muốn xóa tài liệu này?')) return

    try {
      await deleteMaterial(id)
      setMaterials(materials.filter((m) => m.id !== id))
      toast({
        title: 'Thành công',
        description: 'Xóa tài liệu thành công',
      })
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const categories = ['general', 'flutter', 'web', 'mobile', 'project', 'other']

  if (!isTrainer) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Quản lý Tài liệu</h1>
          <p className="text-muted-foreground">Tải lên và quản lý tài liệu tham khảo cho sinh viên</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Tải lên Tài liệu
            </CardTitle>
            <CardDescription>Thêm tài liệu mới</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tên tài liệu</Label>
                <Input
                  id="title"
                  placeholder="VD: Hướng dẫn Flutter"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Danh mục</Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Tệp</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                {file && <p className="text-sm text-muted-foreground">{file.name}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-navy-600 to-navy-700"
                disabled={uploading}
              >
                {uploading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                {uploading ? 'Đang tải...' : 'Tải lên'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Materials List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Danh sách Tài liệu ({materials.length})
            </CardTitle>
            <CardDescription>Quản lý tài liệu đã tải lên</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : materials.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                Chưa có tài liệu nào
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên</TableHead>
                      <TableHead>Danh mục</TableHead>
                      <TableHead>Kích thước</TableHead>
                      <TableHead>Người tải</TableHead>
                      <TableHead>Ngày tải</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.title}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {material.category}
                          </span>
                        </TableCell>
                        <TableCell>{formatFileSize(material.fileSize)}</TableCell>
                        <TableCell>{material.uploadedBy}</TableCell>
                        <TableCell>
                          {new Date(material.uploadedAt).toLocaleDateString('vi-VN')}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <a
                              href={material.downloadUrl}
                              download
                              className="p-1 hover:bg-blue-100 rounded"
                            >
                              <Download className="h-4 w-4 text-blue-500" />
                            </a>
                            <button
                              onClick={() => handleDelete(material.id)}
                              className="p-1 hover:bg-red-100 rounded"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
