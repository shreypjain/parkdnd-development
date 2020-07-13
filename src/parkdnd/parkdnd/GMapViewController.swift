//
//  GMapViewController.swift
//  ParkDND
//
//  Created by Shrey Jain on 7/12/20.
//  Copyright © 2020 Shrey Jain. All rights reserved.
//

import UIKit
import MapKit
import CoreLocation

class GMapViewController: UIViewController {
    let KEY = "AIzaSyDFeL1SysM-kXcgsF4BIpgsE4fIbGvnrUQ"
    
    let locationManager = CLLocationManager()
    
    
    @IBOutlet weak var mapView: MKMapView!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        checkLocationServices()

    }
    func checkLocationAuthorization() {
        switch CLLocationManager.authorizationStatus() {
        case .authorizedWhenInUse:
            mapView.showsUserLocation = true
            centerViewOnUserLocation()
            locationManager.startUpdatingLocation()
            break
        case .denied:
            // show alert for doing permission again
            break
        case .notDetermined:
            locationManager.requestWhenInUseAuthorization()
        case .restricted:
            // SHow an alert that it could be restricted
            break
        case .authorizedAlways:
            break
        }
    }
    func centerViewOnUserLocation() {
        if let location = locationManager.location?.coordinate {
            let region = MKCoordinateRegion.init(center: location, latitudinalMeters: 1000, longitudinalMeters: 1000)
            mapView.setRegion(region, animated: true)
        }
    }
    func setupLocationManager() {
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
    }
    func checkLocationServices() {
        if CLLocationManager.locationServicesEnabled() {
            // the user has setup location so they are good to go
            setupLocationManager()
            checkLocationAuthorization()
        } else {
            //Show user how to turn this on
        }
    }

}

extension GMapViewController: CLLocationManagerDelegate {
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.last else { return }
        let center = CLLocationCoordinate2D(latitude: location.coordinate.latitude, longitude: location.coordinate.longitude)
        let region = MKCoordinateRegion.init(center: center, latitudinalMeters: 1000, longitudinalMeters: 1000)
        mapView.setRegion(region, animated: true)
    }
    
    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        checkLocationAuthorization()
    }
    
}
