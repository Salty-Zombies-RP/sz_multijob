fx_version "cerulean"
game "gta5"
lua54 'yes'
title "LB Phone - Multijob"
description "Multijob Selector"
author "Solao Bajiuik"

shared_scripts {
    "@ox_lib/init.lua",
    "config.lua"
}
client_scripts {
    "@qbx_core/modules/playerdata.lua",
    "client/**.lua"
}

server_scripts { "server/**.lua" }

file "ui/dist/**/*"

ui_page "ui/dist/index.html"
-- ui_page "http://localhost:3000/"

dependency "qbx_core"
dependency "lb-phone"
dependency "ox_lib"