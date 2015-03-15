package com.example.nwhacks;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

import java.util.ArrayList;
import java.util.List;
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.AdapterView.OnItemClickListener;
import com.facebook.*;
import com.facebook.model.GraphObject;
import com.facebook.model.GraphPlace;
import com.facebook.model.GraphUser;
import com.facebook.widget.*;

public class MainActivity extends Activity {
	
	private LoginButton loginButton;
	ListView list;
    private List<String> List_file;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
        List_file =new ArrayList<String>();
       list = (ListView)findViewById(R.id.list1);
 
        CreateListView();
        
        loginButton = (LoginButton) findViewById(R.id.login_button);
        loginButton.setUserInfoChangedCallback(new LoginButton.UserInfoChangedCallback() {
            @Override
            public void onUserInfoFetched(GraphUser user) {
                MainActivity.this.user = user;
                updateUI();
                // It's possible that we were waiting for this.user to be populated in order to post a
                // status update.
                handlePendingAction();
            }
	}

	
	private void CreateListView()
    {
         List_file.add("Alderan");
         List_file.add("r2d2");
         List_file.add("sing for the moment");
         List_file.add("turn down for what");
         List_file.add("nexus ");
         List_file.add(" age of empires");
         List_file.add(" hannibal");
         List_file.add(" julius");
         List_file.add(" market place iga");
         List_file.add(" dominic republic");
         List_file.add(" uggs");
         List_file.add(" putin");
         List_file.add(" marco polo");
         List_file.add(" lalalalala");
         List_file.add(" Queen Elizabeth");
         List_file.add(" whoopi gouldberg");
         
         //Create an adapter for the listView and add the ArrayList to the adapter.
         list.setAdapter(new ArrayAdapter<String>(MainActivity.this, android.R.layout.simple_list_item_1,List_file));
         list.setOnItemClickListener(new OnItemClickListener()
           {
                @Override
                public void onItemClick(AdapterView<?> arg0, View arg1, int arg2,long arg3)
                {
                    //args2 is the listViews Selected index
                }
           });
    }
	
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings) {
			return true;
		}
		return super.onOptionsItemSelected(item);
	}
}
