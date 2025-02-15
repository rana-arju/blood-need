"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { toast } from "sonner"

export default function FindBlood() {
  const [bloodGroup, setBloodGroup] = useState("")
  const [address, setAddress] = useState("")
  const [donors, setDonors] = useState([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/find-blood?bloodGroup=${bloodGroup}&address=${address}`)
      if (response.ok) {
        const data = await response.json()
        setDonors(data)
      } else {
        throw new Error("Failed to find donors")
      }
    } catch (error) {
      toast.error( "Failed to find donors. Please try again.",
      )
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Blood</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <Select onValueChange={setBloodGroup}>
          <SelectTrigger>
            <SelectValue placeholder="Select blood group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Find Donors
        </Button>
      </form>
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Donors</h2>
        {donors.length > 0 ? (
          <ul className="space-y-2">
            {donors.map((donor: any) => (
              <li key={donor._id} className="border p-4 rounded">
                <p>
                  <strong>Name:</strong> {donor.name}
                </p>
                <p>
                  <strong>Blood Group:</strong> {donor.bloodGroup}
                </p>
                <p>
                  <strong>Address:</strong> {donor.address}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No donors found matching your criteria.</p>
        )}
      </div>
    </div>
  )
}

