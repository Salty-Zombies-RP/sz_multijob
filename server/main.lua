if not lib.checkDependency('qbx_core', '1.7.0') then
    error("qbx_core 1.7.0 or newer is required.")
end

if GetCurrentResourceName() ~= 'sz_multijob' then
    lib.print.error('The resource must be named ^5sz_multijob^7.')
    return
end

-- Utility function to check if the player has a specific job in their job list
local function canSetJob(player, jobName)
    return player.PlayerData.jobs[jobName] ~= nil
end

-- Handle changing the player's active job
lib.callback.register('sz_multijob:server:changeJob', function(source, job)
    local player = exports.qbx_core:GetPlayer(source)

    -- Validate if the player is already in the selected job
    if player.PlayerData.job.name == job then
        exports.qbx_core:Notify(source, ('You are already working as a %s'):format(job), 'error')
        return
    end

    -- Validate if the job exists
    local jobInfo = exports.qbx_core:GetJob(job)
    if not jobInfo then
        exports.qbx_core:Notify(source, 'Invalid job.', 'error')
        return
    end

    -- Check if the player is allowed to switch to the specified job
    if not canSetJob(player, job) then
        exports.qbx_core:Notify(source, 'You do not have access to this job.', 'error')
        return
    end

    -- Update the player's primary job
    exports.qbx_core:SetPlayerPrimaryJob(player.PlayerData.citizenid, job)
    exports.qbx_core:Notify(source, ('Your job is now: %s'):format(jobInfo.label))
    player.Functions.SetJobDuty(true)
    return true
end)

-- Handle the removal of a job from the player's job list
lib.callback.register('sz_multijob:server:deleteJob', function(source, job)
    local player = exports.qbx_core:GetPlayer(source)

    -- Validate if the job exists
    local jobInfo = exports.qbx_core:GetJob(job)
    if not jobInfo then
        exports.qbx_core:Notify(source, 'Invalid job.', 'error')
        return
    end

    for jobName, _ in pairs(player.PlayerData.jobs) do
        if jobName ~= job then
            exports.qbx_core:SetPlayerPrimaryJob(player.PlayerData.citizenid, jobName)
            player.Functions.SetJobDuty(true)
        end
    end

    -- Remove the player from the specified job
    exports.qbx_core:RemovePlayerFromJob(player.PlayerData.citizenid, job)
    exports.qbx_core:Notify(source, ('You have quit your %s job.'):format(jobInfo.label))
    return true
end)
