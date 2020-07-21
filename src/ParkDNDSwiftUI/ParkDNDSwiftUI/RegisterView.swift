//
//  RegisterView.swift
//  Login Boilerplate
//
//  Created by Neloy Kundu on 6/8/20.
//  Copyright © 2020 Neloy Kundu. All rights reserved.
//
import SwiftUI

struct RegisterInfo: Codable {
    let username: String
    let email: String
    let password: String
}

struct RegisterView: View {
    @State private var username = ""
    @State private var email = ""
    @State private var password1 = ""
    @State private var password2 = ""
    
    @State private var showingAlert = false
    @State private var alertTitle = ""
    @State private var alertMessage = ""
    var body: some View {
        VStack {
            Text("Make a new account").bold().padding().multilineTextAlignment(.leading).font(.title)
            ZStack{
                Color.pink
                VStack {
                    Spacer()
                    HStack {
                        Text("Create username: ").bold().foregroundColor(.white).multilineTextAlignment(.leading).padding()
                        Spacer()
                        TextField("...", text: $username)
                        .multilineTextAlignment(.center).foregroundColor(.white).background(Color.black).frame(width: 150, height: 35).cornerRadius(25).padding()
                    }
                    
                    HStack {
                        Text("Choose email: ").bold().foregroundColor(.white).multilineTextAlignment(.leading).padding()
                        Spacer()
                        TextField("...", text: $email)
                        .multilineTextAlignment(.center).foregroundColor(.white).background(Color.black).frame(width: 150, height: 35).cornerRadius(25).padding()
                    }
                    
                    HStack {
                        Text("Create password: ").bold().foregroundColor(.white).multilineTextAlignment(.leading).padding()
                        Spacer()
                        SecureField("...", text: $password1)
                        .multilineTextAlignment(.center).foregroundColor(.white).background(Color.black).frame(width: 150, height: 35).cornerRadius(25).padding()
                    }
                    
                   HStack {
                        Text("Confirm password: ").bold().foregroundColor(.white).multilineTextAlignment(.leading).padding()
                        Spacer()
                        SecureField("...", text: $password2)
                        .multilineTextAlignment(.center).foregroundColor(.white).background(Color.black).frame(width: 150, height: 35).cornerRadius(25).padding()
                    }
                    
                    Button("Register"){
                        self.register()
                        
                        }.foregroundColor(.white).frame(width: 100, height: 40, alignment: .center).background(Color.black).cornerRadius(25).padding()
                    Spacer()
                    Spacer()
                }
            }.alert(isPresented: $showingAlert){
                Alert(title: Text(self.alertTitle), message: Text(self.alertMessage), dismissButton: .cancel())
            }
        }
    }
    func register() {
        //DO REGISTERING STUFF HERE
        
        //VALIDATION OF THE FORM
        if !isValidEmail(self.email){
            makeAlert(title: "Passwords do not match", message: "Correct your passwords")
            return
        }
        if password1 != password2 {
            makeAlert(title: "Invalid Email", message: "Put your email in a valid form")
            return
        }
        
        //SENDING NEW REGISTERING TO SERVER
        let newRegInfo = RegisterInfo(username: self.username, email: self.email, password: self.password1)
        guard let encoded = try? JSONEncoder().encode(newRegInfo) else {
            print("Failed to encode order")
            return
        }
        
        let url = URL(string: "http://localhost:5000/")! //This should be a registering endpoint
        var request = URLRequest(url:url)
        request.setValue("application/json", forHTTPHeaderField: "Content-type")
        request.httpMethod = "POST"
        request.httpBody = encoded
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data else {
                
                self.makeAlert(title: "No connection", message: "Could not connect to server")
                print("No data in response: \(error?.localizedDescription ?? "Unknown error").")
                return
                
            }
            if let decoded = try? JSONDecoder().decode(String.self, from: data) {
                self.makeAlert(title: "Success!", message: decoded)
                
            } else {
                self.makeAlert(title: "Invalid Response", message: "Could not understand server's response")
                
            }
        }.resume()
        
        
    }
    
    
    func isValidEmail(_ email: String) -> Bool {    //Used to validate email
        let emailRegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"

        let emailPred = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        return emailPred.evaluate(with: email)
    }
    
    func makeAlert(title:String,message:String) {
        self.alertTitle = title
        self.alertMessage = message
        self.showingAlert = true
    }
}


struct RegisterView_Previews: PreviewProvider {
    static var previews: some View {
        RegisterView()
    }
}
