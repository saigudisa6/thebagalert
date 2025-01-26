"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";



export default function AccountPage() {
    const { toast } = useToast();

    // Replace with user data from get requests
    const [user, setUser] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        accountLevel: "Premium",
        xp: 1200,
        subscribedTopics: [
            { name: "Technology", level: "Advanced" },
            { name: "Health", level: "Intermediate" },
            { name: "Education", level: "Beginner" },
            { name: "Investing", level: "Quite High" }
        ],
    });

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Account Details</h1>
            <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4 gap-4 bg-black p-1 rounded-lg">
                <TabsTrigger 
                    value="overview" 
                    className="px-4 py-2 rounded-md transition-all 
                            bg-gray-800 text-white 
                            hover:bg-gray-500 
                            data-[state=active]:bg-white data-[state=active]:text-black"
                >
                    Overview
                </TabsTrigger>
                <TabsTrigger 
                    value="edit" 
                    className="px-4 py-2 rounded-md transition-all 
                            bg-gray-800 text-white 
                            hover:bg-gray-500 
                            data-[state=active]:bg-white data-[state=active]:text-black"
                >
                    Edit Profile
                </TabsTrigger>
            </TabsList>

                <TabsContent value="overview">
                    <Card className="font-serif">
                        <CardHeader>
                            <CardTitle>Profile Overview</CardTitle>
                            <CardDescription>View your account information</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div>
                                    <p className="text-lg font-semibold">Full Name</p>
                                    <p className="text-gray-600 mb-4">
                                        {user.firstName} {user.lastName}
                                    </p>
                                    <p className="text-lg font-semibold">Email</p>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>

                                {/* Right Column */}
                                <div>
                                    <p className="text-lg font-semibold">Account Level</p>
                                    <p className="text-gray-600 mb-4">{user.accountLevel}</p>
                                    <p className="text-lg font-semibold">XP</p>
                                    <p className="text-gray-600 mb-4">{user.xp}</p>

                                    <p className="text-lg font-semibold">Subscribed Topics</p>
                                    <ul className="text-gray-600 space-y-2">
                                        {user.subscribedTopics.map((topic, index) => (
                                            <li key={index} className="flex justify-between border-b pb-1">
                                                <span>{topic.name}</span>
                                                <span className="text-sm text-gray-500">{topic.level}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="edit">
                    <Card className="font-serif">
                        <CardHeader>
                            <CardTitle>Edit Profile</CardTitle>
                            <CardDescription>Update your account details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label>First Name</Label>
                                    <Input
                                        value={user.firstName}
                                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label>Last Name</Label>
                                    <Input
                                        value={user.lastName}
                                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => toast({ title: "Profile updated successfully!" })}
                            >
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
