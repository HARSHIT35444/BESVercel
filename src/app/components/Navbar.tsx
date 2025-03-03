"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isEnquiryOpen, setIsEnquiryOpen] = React.useState(false);

  return (
    <div className="border-b">
      <div className="flex h-20 items-center px-4 container mx-auto">
        <Link href="/" className="font-bold text-xl">
          Bombay Engineering Syndicate
        </Link>
        
        {/* Desktop Navigation */}
        <div className="ml-auto hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <Link href="/" className="text-sm font-medium">
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/Products" className="text-sm font-medium">
                  Products
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/About-Us" className="text-sm font-medium">
                  About-Us
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <DropdownMenu open={isEnquiryOpen} onOpenChange={setIsEnquiryOpen}>
                  <div onMouseEnter={() => setIsEnquiryOpen(true)} onMouseLeave={() => setIsEnquiryOpen(false)}>
                    <DropdownMenuTrigger asChild>
                      <span className="text-sm font-medium cursor-pointer">
                        Enquiry-Form
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem asChild>
                        <Link href="/ACMotorEnquiryForm">AC Motor</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/DCMotorEnquiryForm">DC Motor</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/Contact" className="text-sm font-medium">
                  Contact-Us
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/Blogs" className="text-sm font-medium">
                  Blog-Page
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/FAQ" className="text-sm font-medium">
                    FAQ
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="ml-auto md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services">Services</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
