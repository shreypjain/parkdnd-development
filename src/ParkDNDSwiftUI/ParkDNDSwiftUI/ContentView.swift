//
//  ContentView.swift
//  ParkDNDSwiftUI
//
//  Created by Neloy Kundu on 7/21/20.
//  Copyright © 2020 Neloy Kundu. All rights reserved.
//

import SwiftUI

class UserDetails {
    let username : String
    let currentSpots : Int
    let location : String
    
    init (name : String, spots : Int, loc : String){
        self.username = name
        self.currentSpots = spots
        self.location = loc
    }
}

struct ContentView: View {
    @State var currentScreen = "login"
    @State var currentUserDetails : UserDetails? = nil
    var body: some View {
        Group {
            if currentScreen == "login"{
                VStack {
                    LoginView(currentScreen: self.$currentScreen, currentUserDetails: self.$currentUserDetails)

                }.animation(.easeIn)
            } else if currentScreen == "hostScreen" {
                VStack{
                    HostView(currentScreen: self.currentScreen, currentUserDetails: self.currentUserDetails!)
                    }
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
