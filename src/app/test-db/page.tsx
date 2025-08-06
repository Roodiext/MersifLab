import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function TestDBPage() {
  try {
    // Test koneksi dan ambil data users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
        <div className="bg-green-100 p-4 rounded mb-4">
          <p className="text-green-800">✅ Database connected successfully!</p>
          <p className="text-green-800">✅ Prisma working correctly!</p>
        </div>
        
        <h2 className="text-xl font-semibold mb-2">Users in Database:</h2>
        <div className="space-y-2">
          {users.map(user => (
            <div key={user.id} className="bg-gray-100 p-3 rounded">
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Created:</strong> {user.createdAt.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
        <div className="bg-red-100 p-4 rounded">
          <p className="text-red-800">❌ Database connection failed!</p>
          <p className="text-red-800">Error: {String(error)}</p>
        </div>
      </div>
    )
  }
}