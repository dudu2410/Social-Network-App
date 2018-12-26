package vn.hcmus.forestnetwork.util;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class JsonUtil {

    public static Map<String, Object> jsonToMap(String t, String type) throws JSONException {

        HashMap<String, Object> map = new HashMap<>();
        JSONObject jObject = new JSONObject(t);
        Iterator<?> keys = jObject.keys();
        while (keys.hasNext()) {
            String key = (String) keys.next();
            String value = jObject.getString(key);
            Object finalObject = null;
            if (isJSONValid(value) && !type.equals("followings")) {
                finalObject = jsonToMap(value, type);
            }
            map.put(key, finalObject == null ? value : finalObject);

        }
        return map;
    }


    public static boolean isJSONValid(String test) {
        try {
            new JSONObject(test);
        } catch (JSONException ex) {
            // edited, to include @Arthur's comment
            // e.g. in case JSONArray is valid as well...
            try {
                new JSONArray(test);
            } catch (JSONException ex1) {
                return false;
            }
        }
        return true;
    }
}
