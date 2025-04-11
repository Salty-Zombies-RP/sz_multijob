if GetCurrentResourceName() ~= 'sz_multijob' then
    lib.print.error('The resource must be named ^5sz_multijob^7.')
    return
end

while GetResourceState("lb-phone") ~= "started" do
    Wait(500)
end

Wait(1000) -- wait for the AddCustomApp export to exist

local url = GetResourceMetadata(GetCurrentResourceName(), "ui_page", 0)

local function AddApp()
    local added, errorMessage = exports["lb-phone"]:AddCustomApp({
        identifier = Config.Identifier, -- unique app identifier

        name = Config.Name,
        description = Config.Description,
        developer = Config.Developer,

        defaultApp = Config.DefaultApp, -- should the app be installed by default? this also means that you can't uninstall it
        size = 59812, -- the app size in kb

        ui = url:find("http") and url or GetCurrentResourceName() .. "/" .. url,
        icon = url:find("http") and url .. "/public/icon.svg" or "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/dist/icon.svg",

        fixBlur = true,

        onUse = function() -- OPTIONAL function to be called when the app is opened
            SendAppMessage(Config.Identifier, "open", "open")
        end,
    })

    if not added then
        print("Could not add app:", errorMessage)
    end
end

AddApp()

AddEventHandler("onResourceStart", function(resource)
    if resource == "lb-phone" then
        AddApp()
    end
end)

RegisterNUICallback('getJobs', function(_, callback)
    -- Fetch player data from QBox object
    local PlayerData = QBX.PlayerData

    if not PlayerData or not PlayerData.jobs then
        print("^1Error:^7 PlayerData or jobs field is missing in QBox.")
        callback(json.encode({ error = "Player data or jobs not found." }))
        return
    end

    local jobs = {}

    local currentJob = PlayerData.job

    table.insert(jobs, {
        Name = currentJob.name,
        Label = currentJob.label,
        Grade = currentJob.grade.level,
        GradeData = exports.qbx_core:GetJob(currentJob.name).grades[currentJob.grade.level],
        PrimaryJob = true,
        OnDuty = currentJob.onduty
    })

    -- Loop through player jobs
    for jobName, jobGrade in pairs(PlayerData.jobs) do
        -- Fetch additional job details from the QBox GetJob export
        jobInfo = exports.qbx_core:GetJob(jobName)

        if jobInfo then
            if currentJob.name ~= jobName then
                -- Build the coordinated job data
                table.insert(jobs, {
                    Name = jobName,
                    Label = jobInfo.label,
                    Grade = jobGrade,
                    GradeData = jobInfo.grades[jobGrade],
                    PrimaryJob = false,
                    OnDuty = false
                })
            end
        else
            print("^3Warning:^7 Could not find job information for jobName:", jobName)
        end
    end

    lib.print.error(jobs)
    -- Return the coordinated jobs data as a JSON object
    callback(json.encode(jobs))
end)

RegisterNUICallback('changeJob', function(job, cb)
    lib.callback('sz_multijob:server:changeJob', false, function()
        cb(true)
        SendAppMessage(Config.Identifier, "open", "open")
    end, job)
end)

RegisterNUICallback('removeJob', function(job, cb)

    lib.callback('sz_multijob:server:deleteJob', false, function()
        cb(true)
        SendAppMessage(Config.Identifier, "open", "open")
    end, job)
end)

RegisterNUICallback('toggleDuty', function(_, cb)
    TriggerServerEvent('QBCore:ToggleDuty')
    cb(true)
end)