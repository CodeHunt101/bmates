# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

harold = User.create({
  first_name: "Harold",
  last_name: "Torres",
  gender: "M",
  bio: "blah blah blah",
  username: "haroldtm55",
  email: "harold@example.com",
  mate: true,
  password: "password",
  password_confirmation: "password"
})

harold_listing = Listing.create({
  title: "Platonic Sugar Daddy",
  description: "bleh bleh",
  mate: harold
})

siri = User.create({
  first_name: "Siri",
  last_name: "Watasir",
  gender: "F",
  bio: "blah blah blah",
  username: "chongnang",
  email: "siri@example.com",
  mate: false,
  password: "password",
  password_confirmation: "password"
})

# siri_reservation = Reservation.create({
#   listing: harold_listing,
#   member: siri,
#   status: "pending",
#   date: "01/01/2022",
#   checkin_time: "1200",
#   checkout_time: "1400"
# })

siri_reservation = Reservation.create({
  listing: harold_listing,
  member: siri,
  status: "pending",
  checkin: '2022-02-02 01:00:00',
  checkout: '2022-02-02 02:00:00' 
})