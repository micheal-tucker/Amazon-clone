"use client"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      {/* Back to top */}
      <div
        className="bg-gray-700 hover:bg-gray-600 text-center py-4 cursor-pointer transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span className="text-sm">Back to top</span>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Amazon
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Investor Relations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Sell products on Amazon
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sell on Amazon Business
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sell apps on Amazon
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Become an Affiliate
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Amazon Payment Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Amazon Business Card
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shop with Points
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Reload Your Balance
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Amazon Currency Converter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Amazon and COVID-19
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Your Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Your Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shipping Rates & Policies
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Returns & Replacements
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-2xl font-bold">
                amazon<span className="text-orange-400">.com</span>
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1">
                <option>English</option>
                <option>Español</option>
                <option>Français</option>
              </select>
              <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1">
                <option>$ USD - U.S. Dollar</option>
                <option>€ EUR - Euro</option>
                <option>£ GBP - British Pound</option>
              </select>
              <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1">
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-400">
          <p>&copy; 1996-2024, Amazon.com, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  )
}
