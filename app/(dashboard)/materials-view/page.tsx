'use client'

import { useState, useEffect } from 'react'
import { Download, FileText, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { getMaterials } from '@/lib/firebase/firestore'
import { Material } from '@/types'

const CATEGORIES = ['Slides', 'Handout', 'Video', 'Exercise', 'Reference']

export default function MaterialsViewPage() {
  const [materials, setMaterials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadMaterials()
  }, [])

  const loadMaterials = async () => {
    try {
      setLoading(true)
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

  const filteredMaterials = selectedCategory
    ? materials.filter((m) => m.category === selectedCategory)
    : materials

  const handleDownload = (downloadUrl: string, fileName: string) => {
    try {
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể tải file',
        variant: 'destructive',
      })
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Slides: 'bg-blue-100 text-blue-800',
      Handout: 'bg-green-100 text-green-800',
      Video: 'bg-red-100 text-red-800',
      Exercise: 'bg-purple-100 text-purple-800',
      Reference: 'bg-yellow-100 text-yellow-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Learning Materials</h1>
        <p className="text-gray-600">Access course materials and resources</p>
      </div>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
            >
              All ({materials.length})
            </Button>
            {CATEGORIES.map((cat) => {
              const count = materials.filter((m) => m.category === cat).length
              return (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat} ({count})
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Materials Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : filteredMaterials.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-gray-500">No materials available</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{material.title}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      {new Date(material.uploadedAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={`${getCategoryColor(material.category)} w-fit`}>
                  {material.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Uploaded by: {material.uploadedBy}</span>
                    {material.fileSize && (
                      <span>{(material.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                    )}
                  </div>
                  <Button
                    onClick={() => handleDownload(material.downloadUrl, material.fileName)}
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
