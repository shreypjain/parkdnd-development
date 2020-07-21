//
//  LoginView.swift
//  Login Boilerplate
//
//  Created by Neloy Kundu on 6/9/20.
//  Copyright © 2020 Neloy Kundu. All rights reserved.
//

import SwiftUI

struct UserCredentials : Codable {
    let username:String
    let password:String
}

struct LoginView: View {
    @State private var username = ""
    @State private var password = ""
    @Binding var currentScreen: String
    @Binding var currentUserDetails: UserDetails?
    
    @State private var showingAlert = false
    @State private var alertTitle = ""
    @State private var alertMessage = ""
    var body: some View {
        NavigationView{
            VStack{
                Spacer()
                Text("Login").font(.title).bold()
                ZStack{
                    Color.pink.frame(width: 200, height: 200, alignment: .center).cornerRadius(10)
                    VStack {
                        HStack {
                            Spacer()
                            TextField("Username...", text: $username)
                            Spacer()
                        }.multilineTextAlignment(.center).background(Color.white).frame(width: 160, height: 30).cornerRadius(25)
                        HStack {
                            Spacer()
                            SecureField("Password...", text: $password)
                            
                        }.multilineTextAlignment(.center).background(Color.white).frame(width: 160, height: 30).cornerRadius(25)
                        Button("Login"){
                            self.login()
                            }.foregroundColor(.white).frame(width: 60, height: 30, alignment: .center).background(Color.black).cornerRadius(25).padding()
                        
                    }
                }
                NavigationLink(destination: RegisterView()){
                    Text("Don't have an account? Register here")
                }
                Spacer()
                Spacer()
                Spacer()
                
            }.alert(isPresented: $showingAlert){
                Alert(title: Text(self.alertTitle), message: Text(self.alertMessage), dismissButton: .cancel())
            }
        }
    }
    func login() {
        //DO LOGIN STUFF HERE
        let userAndPass = UserCredentials(username: self.username, password: self.password)
        guard let encoded = try? JSONEncoder().encode(userAndPass) else {
            print("Failed to encode order")
            return
        }
        
        let url = URL(string: "http://localhost:5000/")!        //This should be a logging in endpoint
        var request = URLRequest(url:url)
        request.setValue("application/json", forHTTPHeaderField: "Content-type")
        request.httpMethod = "POST"
        request.httpBody = encoded
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data else {
                
                DispatchQueue.main.async {
                    self.makeAlert(title: "No connection", message: "Could not connect to server")
                    self.currentUserDetails = UserDetails(name: "Neloy Kundu", spots: 3, loc: "Queens, New York")
                    self.currentScreen = "hostScreen"
                }
                print("No data in response: \(error?.localizedDescription ?? "Unknown error").")
                return
                
            }
            if let decoded = try? JSONDecoder().decode(String.self, from: data) {
                DispatchQueue.main.async {
                    self.makeAlert(title: "Success!", message: decoded)
                    self.currentUserDetails = UserDetails(name: "Neloy Kundu", spots: 3, loc: "Queens, New York")
                    self.currentScreen = "hostScreen"
                }
                
            } else {
                DispatchQueue.main.async {
                    self.makeAlert(title: "Invalid Response", message: "Could not understand server's response")
                    self.currentUserDetails = UserDetails(name: "Neloy Kundu", spots: 3, loc: "Queens, New York")
                    self.currentScreen = "hostScreen"
                }
            }
        }.resume()
        
    }
    
    func makeAlert(title:String,message:String) {
        self.alertTitle = title
        self.alertMessage = message
        self.showingAlert = true
    }
}
